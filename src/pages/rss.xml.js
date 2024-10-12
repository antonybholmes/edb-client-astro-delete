import rss from "@astrojs/rss"
import { APP_NAME, SITE_DESCRIPTION } from "../consts"

export async function GET(context) {
  //const posts = await getCollection("blog")
  return rss({
    title: APP_NAME,
    description: SITE_DESCRIPTION,
    site: context.site,
    // items: posts.map(post => ({
    //   ...post.data,
    //   link: `/blog/${post.slug}/`,
    // })),
    items: [],
  })
}
