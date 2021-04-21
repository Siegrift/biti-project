const Script = () => {
  // This is rendered differently on server and on client.
  //
  // If you use input which needs to be encode (e.g. contains quotes)
  // then it will not be executed. However, input such as number can
  // trigger error when rendered on server side. 
  // Another example, why preventing reflected XSS is not in scope for TT.
  return <script>alert(123)</script>
}

export default Script
