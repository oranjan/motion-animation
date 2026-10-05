const artwork = (id) => ({
  thumb: `/covers/${id}-thumb.jpg`,
  large: `/covers/${id}-large.jpg`,
});

export const regions = [
  { id: "all", label: "All" },
  { id: "us", label: "USA" },
  { id: "in", label: "India" },
];

export const songs = [
  {
    id: "no-role-modelz",
    region: "us",
    rank: 1,
    title: "No Role Modelz",
    artist: "J. Cole",
    artistIds: ["j-cole"],
    album: "2014 Forest Hills Drive",
    cover: artwork("no-role-modelz"),
  },
  {
    id: "sunflower",
    region: "us",
    rank: 2,
    title: "Sunflower",
    artist: "Post Malone, Swae Lee",
    artistIds: ["post-malone", "swae-lee"],
    album: "Spider-Man: Into the Spider-Verse",
    cover: artwork("sunflower"),
  },
  {
    id: "sweater-weather",
    region: "us",
    rank: 3,
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    artistIds: ["the-neighbourhood"],
    album: "I Love You.",
    cover: artwork("sweater-weather"),
  },
  {
    id: "agar-tum-saath-ho",
    region: "in",
    rank: 1,
    title: "Agar Tum Saath Ho",
    artist: "Alka Yagnik, Arijit Singh",
    artistIds: ["alka-yagnik", "arijit-singh"],
    album: "Tamasha",
    cover: artwork("agar-tum-saath-ho"),
  },
  {
    id: "tujhe-kitna-chahne-lage",
    region: "in",
    rank: 2,
    title: "Tujhe Kitna Chahne Lage",
    artist: "Arijit Singh",
    artistIds: ["arijit-singh"],
    album: "Kabir Singh",
    cover: artwork("tujhe-kitna-chahne-lage"),
  },
  {
    id: "apna-bana-le",
    region: "in",
    rank: 3,
    title: "Apna Bana Le",
    artist: "Sachin-Jigar, Arijit Singh",
    artistIds: ["sachin-jigar", "arijit-singh"],
    album: "Bhediya",
    cover: artwork("apna-bana-le"),
  },
];

export const artists = {
  "j-cole": {
    name: "J. Cole",
    bio: [
      "Jermaine Cole was born on a US military base in Germany and grew up in Fayetteville, North Carolina. He taught himself piano and moved to New York City for college to chase a music career. His 2007 mixtape The Come Up got him noticed, and in 2009 he signed with Jay-Z's Roc Nation, which put out his next mixtapes, The Warm Up and Friday Night Lights.",
      "Every one of his studio albums has reached No. 1 on the Billboard 200, starting with Cole World: The Sideline Story in 2011. From 2014 Forest Hills Drive onward his writing turned more personal and introspective. The album is named after the Fayetteville house he grew up in, and in 2015 he began letting single mothers live there rent-free. KOD (2018) put six songs in the Hot 100's top 20 at once, something last done by the Beatles in 1964.",
      "Cole produces much of his own music and has made beats for Kendrick Lamar, Janet Jackson and Mac Miller. He runs Dreamville Records, home to JID and Ari Lennox, whose Revenge of the Dreamers III debuted at No. 1. His seventh album, The Fall-Off (2026), was billed as his last.",
    ],
  },
  "post-malone": {
    name: "Post Malone",
    bio: [
      "Austin Post was born in Syracuse, New York, and moved to Grapevine, Texas, at nine when his father took a job with the Dallas Cowboys. His dad, a former DJ, played him everything from hip-hop to country to rock. Guitar Hero got him into guitar, and as a teenager he played in a local metalcore band.",
      "His 2015 debut single White Iverson led to a deal with Republic Records. Beerbongs & Bentleys (2018) debuted at No. 1, broke streaming records and gave him two chart-toppers, Rockstar and Psycho. That same year Sunflower, his duet with Swae Lee for Spider-Man: Into the Spider-Verse, became the first song ever certified double diamond in the US.",
      "Circles, from Hollywood's Bleeding (2019), spent 61 weeks on the Hot 100. In 2024 he went country with F-1 Trillion, led by the No. 1 hit I Had Some Help with Morgan Wallen. He has sold more than 150 million records in the US and earned eighteen Grammy nominations.",
    ],
  },
  "swae-lee": {
    name: "Swae Lee",
    bio: [
      "Khalif Brown, known as Swae Lee, formed the hip-hop duo Rae Sremmurd with his older brother Slim Jxmmi in 2010. After signing to Mike Will Made It's EarDrummer Records in 2013, the pair broke out with No Flex Zone and No Type, and Black Beatles went to No. 1 on the Hot 100.",
      "On his own, he sang on French Montana's Unforgettable, his first solo top-ten hit, and earned a Grammy nomination for co-writing Beyoncé's Formation. His airy, reverb-soaked vocals made him one of the most in-demand featured artists in pop and hip-hop.",
      "2018 was his biggest year: his debut solo album Swaecation, the record-breaking Sunflower with Post Malone, and an uncredited part on Travis Scott's Sicko Mode, another No. 1. His second solo album, Same Difference, came out in April 2026.",
    ],
  },
  "the-neighbourhood": {
    name: "The Neighbourhood",
    bio: [
      "The Neighbourhood formed in Newbury Park, California, in 2011, with singer Jesse Rutherford, guitarists Jeremy Freedman and Zach Abels, bassist Mikey Margott and drummer Brandon Fried. Two EPs led to a deal with Columbia Records and their debut album, I Love You., in 2013.",
      "Sweater Weather was the album's only Hot 100 hit, peaking at No. 14, then came back nearly a decade later on radio and Spotify. The band followed it with Wiped Out! (2015), a self-titled album (2018) and Chip Chrome & the Mono-Tones (2020), along with fan favourites like Daddy Issues and Softcore.",
      "They went on hiatus in 2022 and announced their return to making music in August 2025. Rutherford has also released solo music since 2016.",
    ],
  },
  "alka-yagnik": {
    name: "Alka Yagnik",
    bio: [
      "Alka Yagnik was born in Kolkata to a Gujarati family; her mother was a classical singer. She was singing on All India Radio in Calcutta by the age of six. At ten her mother took her to Mumbai, where Raj Kapoor heard her sing and sent her to the composer Laxmikant with a letter of recommendation.",
      "She became one of the leading voices of 1990s Bollywood, singing romance, heartbreak and dance numbers across four decades, often in duets with Kumar Sanu, Udit Narayan and Sonu Nigam. Only Lata Mangeshkar and Asha Bhosle have sung more female solo songs in Hindi films.",
      "She has won two National Film Awards and seven Filmfare Awards, and received the Padma Bhushan in 2026. Guinness World Records named her YouTube's most-streamed artist in 2021, with 17 billion streams that year.",
    ],
  },
  "arijit-singh": {
    name: "Arijit Singh",
    bio: [
      "Arijit Singh first appeared on TV in 2005 as a contestant on the reality show Fame Gurukul. He then spent years behind the scenes as a music programmer and assistant to composers including Pritam, before debuting as a playback singer with Phir Mohabbat in 2011.",
      "Tum Hi Ho from Aashiqui 2 (2013) made him a household name and won him his first Filmfare Award. Known for an emotive voice that moves easily between genres, he has become one of the most commercially successful singers in Indian music.",
      "He has won two National Film Awards and eight Filmfare Awards. His eighth, for Sajni in 2025, tied Kishore Kumar's record for Best Male Playback Singer. He received the Padma Shri in 2025 and was Spotify India's most-streamed artist every year from 2019 to 2025.",
    ],
  },
  "sachin-jigar": {
    name: "Sachin–Jigar",
    bio: [
      "Sachin Sanghvi and Jigar Saraiya are both from Gujarat and based in Mumbai. Before teaming up, each spent years assisting the composers Rajesh Roshan and Pritam, and programming and arranging music for others, including A. R. Rahman and Amit Trivedi.",
      "It was Pritam who suggested they work as a duo. They started in 2009 as guest composers on Life Partner, scored their first full album for F.A.L.T.U in 2011, and went on to OMG – Oh My God!, Go Goa Gone and Humpty Sharma Ki Dulhania.",
      "Their later work includes Badlapur, Stree, Bhediya and Zara Hatke Zara Bachke. In 2018 they set up White Noise Studios to find and develop new musical talent.",
    ],
  },
};
