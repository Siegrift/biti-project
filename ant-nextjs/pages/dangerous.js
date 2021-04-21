const Dangerous = ({ payload }) => {
  return <div dangerouslySetInnerHTML={{ __html: payload }}></div>
}

export async function getServerSideProps() {
  // do arbitrary logic on SSR

  // Pass data to the page via props
  // If rendered on server side - then it can easily introduce XSS
  // even when TT are enforced on client side.
  return {
    props: { payload: '<script>alert("GAME OVER WITH SSR");</script>' },
  }
}

export default Dangerous
