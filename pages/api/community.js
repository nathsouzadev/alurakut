export default async function community(request, response) {
    const TOKEN = process.env.DATA_TOKEN
    
    await fetch(
        'https://graphql.datocms.com/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            "query": ` query {
              allCommunities {
                id
                title
                imageUrl
                communityUrl
              }
            }`
          }),
        })
      .then(res => res.json())
      .then((res) => {
        const allCommunities = res.data.allCommunities
        return response.json(allCommunities)
      })
      .catch((error) => {
        console.log(error);
      });
}
