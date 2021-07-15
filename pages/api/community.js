import { SiteClient } from 'datocms-client';

export default async function community(request, response) {
    const TOKEN = '441f486af29e86d7a55f5045bd9571';

    const client = new SiteClient(process.env.DATA_TOKEN)

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
        console.log(allCommunities)
        return response.json(allCommunities)
      })
      .catch((error) => {
        console.log(error);
      });
}
