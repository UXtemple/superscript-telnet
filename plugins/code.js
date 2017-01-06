const CODEBASE = {
  'horizontal': `
  \`\`\`
  - block: Horizontal
    style:
      marginTop: 10
    blocks:
    - ...
  \`\`\`
`
}

exports.code = function(what, cb) {
  cb(null, CODEBASE[what])
}
