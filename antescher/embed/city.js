/* ==========================================================
   Antescher — the city, once, for every embed that needs it.

   Holds the original 16,384-byte map (deflated, base64) plus the
   handful of helpers that read it: height(), solid(), colHeight(),
   settle() and isOpen(). Lifted verbatim from the standalone
   teardown at /antescher/ so both render identical geometry.

   Usage:  Antescher.ready.then(function(city){ ... })
   ========================================================== */
(function (global) {

/* ---------- city data ---------- */
const CITY_B64 = "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";

function b64bytes(s){
  const bin = atob(s), out = new Uint8Array(bin.length);
  for (let i=0;i<bin.length;i++) out[i]=bin.charCodeAt(i);
  return out;
}

let CITY = null;

async function loadCity(){
  const packed = b64bytes(CITY_B64);
  if (typeof DecompressionStream !== 'undefined'){
    try{
      const ds = new DecompressionStream('deflate-raw');
      const stream = new Blob([packed]).stream().pipeThrough(ds);
      const buf = await new Response(stream).arrayBuffer();
      return new Uint8Array(buf);
    }catch(e){ /* fall through */ }
  }
  return inflateRaw(packed);
}

/* minimal raw-inflate fallback */
function inflateRaw(d){
  let bp=0, out=[];
  const bit=()=>{const b=(d[bp>>3]>>(bp&7))&1;bp++;return b;};
  const bits=n=>{let v=0;for(let i=0;i<n;i++)v|=bit()<<i;return v;};
  function build(lens){
    const max=Math.max(...lens), bl=new Array(max+1).fill(0);
    lens.forEach(l=>{if(l)bl[l]++;});
    let code=0; const next=new Array(max+1).fill(0);
    for(let i=1;i<=max;i++){code=(code+bl[i-1])<<1;next[i]=code;}
    const map={};
    lens.forEach((l,i)=>{if(l){map[l+'_'+(next[l]++)]=i;}});
    return {map,max};
  }
  function dec(t){
    let code=0;
    for(let l=1;l<=t.max;l++){
      code=(code<<1)|bit();
      const s=t.map[l+'_'+code];
      if(s!==undefined) return s;
    }
    throw 0;
  }
  const LB=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
  const LE=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];
  const DB=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,12289,16385,24577];
  const DE=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13];
  DB.splice(26,0,8193); DE.splice(26,0,12);
  for(;;){
    const last=bit(), type=bits(2);
    if(type===0){
      bp=(bp+7)&~7; const p=bp>>3;
      const len=d[p]|(d[p+1]<<8);
      for(let i=0;i<len;i++) out.push(d[p+4+i]);
      bp=(p+4+len)<<3;
    } else {
      let lt,dt;
      if(type===1){
        const l=new Array(288); for(let i=0;i<288;i++) l[i]=i<144?8:i<256?9:i<280?7:8;
        lt=build(l); dt=build(new Array(30).fill(5));
      } else {
        const hlit=bits(5)+257, hdist=bits(5)+1, hclen=bits(4)+4;
        const ord=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
        const cl=new Array(19).fill(0);
        for(let i=0;i<hclen;i++) cl[ord[i]]=bits(3);
        const ct=build(cl); const ls=[];
        while(ls.length<hlit+hdist){
          const s=dec(ct);
          if(s<16) ls.push(s);
          else if(s===16){const p=ls[ls.length-1],r=bits(2)+3;for(let i=0;i<r;i++)ls.push(p);}
          else if(s===17){const r=bits(3)+3;for(let i=0;i<r;i++)ls.push(0);}
          else {const r=bits(7)+11;for(let i=0;i<r;i++)ls.push(0);}
        }
        lt=build(ls.slice(0,hlit)); dt=build(ls.slice(hlit));
      }
      for(;;){
        const s=dec(lt);
        if(s===256) break;
        if(s<256) out.push(s);
        else{
          const i=s-257, len=LB[i]+bits(LE[i]);
          const j=dec(dt), dist=DB[j]+bits(DE[j]);
          const st=out.length-dist;
          for(let k=0;k<len;k++) out.push(out[st+k]);
        }
      }
    }
    if(last) break;
  }
  return new Uint8Array(out);
}

/* ---------- reading a column ---------- */
function height(b){
  b &= 0x3F; let h = 0;
  for (let k = 0; k < 6; k++) if (b & (1<<k)) h = k+1;
  return h;
}

/* ==========================================================
   Shared helpers over the city array
   ========================================================== */
const solid = (x,y,z) => {
  if (!CITY || x<0 || y<0 || x>127 || y>127 || z<0) return true;
  if (z>5) return false;
  return (CITY[y*128+x] & (1<<z)) !== 0;
};
const colHeight = (x,y) => {
  if (!CITY || x<0 || y<0 || x>127 || y>127) return 6;
  return height(CITY[y*128+x]);
};
/* drop until a bit is set below us — gravity(), from section 05 */
function settle(x,y,z){
  let n = 0;
  while (z > 0 && !solid(x,y,z-1)) { z--; n++; }
  while (solid(x,y,z) && z < 6) z++;
  return {z, fall:n};
}
function isOpen(x,y){
  const h = colHeight(x,y);
  return h === 0 || h === 1;
}

global.Antescher = {
  ready: loadCity().then(function (c) { CITY = c; return c; }),
  height: height,
  solid: solid,
  colHeight: colHeight,
  settle: settle,
  isOpen: isOpen,
  get city() { return CITY; }
};

})(window);
