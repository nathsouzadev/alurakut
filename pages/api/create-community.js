import { SiteClient } from 'datocms-client';

export default async function community(request, response) {
    const client = new SiteClient(process.env.DATA_TOKEN_FULL);

    const { title, imageUrl, communityUrl } = request.body;

    const newCommunity = client.item.create({
      itemType: "966396",
      title: title,
      imageUrl: imageUrl,
      communityUrl: communityUrl
    })
    
    response.json({
      message: "Comunidade criada",
    })
}
