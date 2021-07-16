export default async function community(request, response) {
    const TOKEN = '4b3a91908f2ed2e44fd7ce484074a2'
    
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
