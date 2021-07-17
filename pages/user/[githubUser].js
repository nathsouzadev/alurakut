export async function getStaticPaths() {
    return {
        paths: [{
            params: {
                githubUser: '1'
            }
        }],
        fallback: 'blocking'
    }
}
export async function getStaticProps(context) {
    const githubUser = context.params.githubUser

    return{
        props: {
            githubUser: githubUser
        }
    }
}

const User = ({ githubUser }) => {

    return(
        <p>githubUser da página: {githubUser}</p>
    )
}

export default User;
