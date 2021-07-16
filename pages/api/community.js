export default async function community(request, response) {
    await fetch(
        'https://graphql.datocms.com/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.DATA_TOKEN}`,
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
