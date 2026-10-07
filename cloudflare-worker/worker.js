const JSON_HEADERS = {'content-type':'application/json; charset=utf-8','access-control-allow-origin':'*','access-control-allow-methods':'POST,OPTIONS','access-control-allow-headers':'content-type'};

function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:JSON_HEADERS});}
function extractJson(text){
  const clean=String(text||'').trim().replace(/^```json\s*/i,'').replace(/^```\s*/,'').replace(/```$/,'').trim();
  try{return JSON.parse(clean)}catch{}
  const m=clean.match(/\{[\s\S]*\}/); if(m) try{return JSON.parse(m[0])}catch{}
  return null;
}

export default {
  async fetch(request, env){
    if(request.method==='OPTIONS') return new Response(null,{status:204,headers:JSON_HEADERS});
    const url=new URL(request.url);
    if(request.method!=='POST' || url.pathname!=='/ocr'){
      if(request.method==='GET' && env.ASSETS) return env.ASSETS.fetch(request);
      return json({ok:false,error:'Use POST /ocr'},405);
    }
    if(!env.GEMINI_API_KEY) return json({ok:false,error:'GEMINI_API_KEY is not configured on the Worker'},503);
    let body;
    try{body=await request.json()}catch{return json({ok:false,error:'Invalid JSON'},400)}
    const mime=String(body?.mimeType||'image/jpeg');
    const image=String(body?.imageBase64||'');
    if(!/^image\/(jpeg|jpg|png|webp|heic|heif)$/i.test(mime)) return json({ok:false,error:'Unsupported image MIME type'},415);
    if(!image || image.length>8_000_000) return json({ok:false,error:'Image missing or too large'},413);
    const model=env.GEMINI_MODEL||'gemini-3.8-flash';
    const prompt=`You are a Japanese handwriting/image OCR assistant for a language-learning app. Read ONLY what is visibly supported by the image. Focus on Japanese characters, kana, kanji, and short Japanese answers. Do not invent unreadable characters. If uncertain, return the uncertain reading and lower confidence. Return ONLY valid JSON with this exact shape: {"extractedText":"string","confidence":0.0,"notes":"string"}. Confidence must be between 0 and 1. notes should briefly explain uncertainty when present.`;
    const endpoint=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
    const api=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({contents:[{role:'user',parts:[{text:prompt},{inline_data:{mime_type:mime,data:image}}]}],generationConfig:{responseMimeType:'application/json'}})});
    if(!api.ok){const t=await api.text();return json({ok:false,error:`Gemini API error ${api.status}`,detail:t.slice(0,500)},502)}
    const data=await api.json();
    const text=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('')||'';
    const parsed=extractJson(text);
    if(!parsed) return json({ok:false,error:'Gemini returned no parseable OCR JSON'},502);
    const confidence=Math.max(0,Math.min(1,Number(parsed.confidence)||0));
    return json({ok:true,extractedText:String(parsed.extractedText||''),confidence,notes:String(parsed.notes||''),model});
  }
};
