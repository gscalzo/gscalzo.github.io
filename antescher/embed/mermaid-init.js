/* ==========================================================
   Antescher — mermaid, themed to match the teardown.
   Loaded by each diagram embed after the mermaid bundle itself.
   ========================================================== */
if (window.mermaid) {
  mermaid.initialize({
    startOnLoad: true, securityLevel: 'loose',
    theme: 'base',
    themeVariables: {
      background: '#12151D', primaryColor: '#1A1E28', primaryTextColor: '#EEF1F6',
      primaryBorderColor: '#272C39', lineColor: '#7C8494', secondaryColor: '#1A1E28',
      tertiaryColor: '#12151D', fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px',
      mainBkg: '#1A1E28', nodeBorder: '#3A4152', clusterBkg: '#12151D',
      edgeLabelBackground: '#12151D', textColor: '#B9C0CC',
      labelBoxBkgColor: '#1A1E28', labelBoxBorderColor: '#272C39'
    },
    flowchart: { curve: 'basis', padding: 14 },
    state: {}
  });
}
