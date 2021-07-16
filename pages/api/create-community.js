import { SiteClient } from 'datocms-client';

export default async function community(request, response) {
  const TOKEN = '4b3a91908f2ed2e44fd7ce484074a2';
    const client = new SiteClient(TOKEN);

    const { title, imageUrl, communityUrl } = request.body;

    const newCommunity = await client.item.create({
      itemType: "966396",
      title: title,
      imageUrl: imageUrl,
      communityUrl: communityUrl
    })
    
    response.json({
      message: "Comunidade criada",
      newCommunity
    })
}
