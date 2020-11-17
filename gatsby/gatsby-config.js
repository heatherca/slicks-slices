// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
import dotenv from 'dotenv';
dotenv.config({path: '.env'});
console.log(process.env.SANITY_TOKEN)

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in hamilton!',
    twitter: '@slicksSlices'
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      // this is the name of the plugin you are adding 
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'lgovfkn7',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      }
    }
  ]
}



// skMRIHAf0LR3E8pHdiyNvGQJ1on3SKfGmwUSOb0zsZ8wfV4UNGZhM1oAX6XLbCOIy4vtqHOvNuJpbjyZMqs1BZTOGERf8VDWxFboTymWWnvyInavP7SoIwH3jcLRhMcpmMs2GLmbucg2algRKAWFCxgjMCpc9osIMPJCD78UdQgdam5NhH0S 