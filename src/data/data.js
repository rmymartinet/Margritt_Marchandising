import {
  maxiBibulleOriginal,
  mecaniqueDesRevesOriginal,
  originalBibulle,
  originalFuturama,
  projectData,
  tirageBibulle3,
  tirageBibulle5,
  tirageFuturama2,
  tirageFuturama3,
} from "./dataImages";

import { DELIVERY_TIMES, PAPER_TYPES } from "./dataConstant";

export const galleryData = [
  {
    id: 1,
    category: "originaux",
    title: "Maxi-Bibulle",
    serie: "Bibulle",
    piece: "Original",
    date: "2019",
    dimension: "extra-large",
    format: "2,60 x 3,8 m",
    tirage: "10 exemplaires numérotés / signés par l'artiste",
    papier: PAPER_TYPES.CLAIREFONTAINE,
    subtitle:
      "Tous les originaux sont disponibles en version tirage. Si une œuvre originale n'est actuellement pas proposée en tirage, nous pouvons la reproduire grâce à nos partenaires spécialisés dans les impressions de haute qualité,  'les courts tirages'.  N'hésitez pas à me contacter pour plus d'informations.",
    livraison: DELIVERY_TIMES,
    note: "Cadre non inclus Me contacter avant achat",
    formatOriginaux: "grand format",
    images: [maxiBibulleOriginal.webp.maxiBibulle],
  },
  {
    id: 2,
    category: "originaux",
    title: "Mécanique des Rêves",
    subtitle:
      "Chaque tirage en édition limitée est numéroté, signé par l'artiste, et accompagné d'un certificat d'authenticité.",
    serie: "Mécanique des Rêve",
    piece: "1ᵉ",
    date: "2016",
    dimension: "extra-large",
    format: "2,60 x 1,57 m",
    tirage: "10 exemplaires numérotés / signés par l'artiste",
    papier: PAPER_TYPES.FINE_ART_COTTON,
    livraison: DELIVERY_TIMES,
    note: "Cadre non inclus Me contacter avant achat",
    formatOriginaux: "grand format",
    images: [mecaniqueDesRevesOriginal.webp.mecaniqueDesReves],
  },
];

export const projectDatas = [
  {
    id: 0,
    title: "Bibulle 3",
    serie: "Bibulle",
    piece: "3ᵉ",
    date: "2023",
    format: "50 x 70 cm",
    images: [projectData.p1.img1, projectData.p1.img2, projectData.p1.img3],
  },
];

export const originauxData = [
  {
    id: 0,
    category: "originaux",
    title: "Bibulle 1",
    serie: "Bibulle",
    piece: "1re",
    dimension: "large-formats",
    date: "2019 - 2020",
    format: "120 x 80 cm",
    price: 600,
    papier: PAPER_TYPES.LAVIS_VINCI,
    images: [originalBibulle.webp.bibulle1],
  },

  {
    id: 1,
    category: "originaux",
    title: "Bibulle 2",
    serie: "Bibulle",
    piece: "2ᵉ ",
    date: "2023 - 2024",
    dimension: "large-formats",
    format: "120 x 80 cm",
    price: 600,
    papier: PAPER_TYPES.LAVIS_VINCI,
    images: [originalBibulle.webp.bibulle2],
  },
  {
    id: 2,
    category: "originaux",
    title: "Bibulle 3",
    serie: "Bibulle",
    piece: "3ᵉ",
    date: "2023",
    dimension: "medium-formats",
    format: "50 x 70 cm",
    price: 250,
    papier: PAPER_TYPES.FINE_ART_COTTON,
    note: "Cadre non inclus Me contacter avant achat",
    images: [
      originalBibulle.webp.bibulle3,
      tirageBibulle3.bibulle3_1,
      tirageBibulle3.bibulle3_2,
      tirageBibulle3.bibulle3_3,
      tirageBibulle3.bibulle3_4,
    ],
  },
  {
    id: 3,
    category: "originaux",
    title: "Bibulle 5",
    serie: "Bibulle",
    piece: "4ᵉ",
    date: "2024",
    dimension: "medium-formats",
    format: "50 x 70 cm",
    price: 250,
    papier: PAPER_TYPES.FINE_ART_COTTON,
    images: [
      originalBibulle.webp.bibulle5,
      tirageBibulle5.bibulle5_1,
      tirageBibulle5.bibulle5_2,
      tirageBibulle5.bibulle5_3,
      tirageBibulle5.bibulle5_4,
    ],
  },

  {
    id: 4,
    category: "originaux",
    title: "Futurama 1",
    serie: "Futurama",
    piece: "1re",
    date: "2019 - 2020",
    dimension: "large-formats",
    format: "120 x 80 cm",
    price: 600,
    papier: PAPER_TYPES.LAVIS_VINCI,
    feutre: "Feutre, alcool",
    images: [originalFuturama.webp.futurama1],
  },
  {
    id: 5,
    category: "originaux",
    title: "Futurama 2",
    serie: "Futurama",
    piece: "2ᵉ",
    date: "2023",
    dimension: "medium-formats",
    format: "50 x 70 cm",
    price: 250,
    tirage: "10 exemplaires numérotés / signés par l'artiste",
    papier: PAPER_TYPES.CLAIREFONTAINE,
    note: "Cadre non inclus Me contacter avant achat",
    images: [
      originalFuturama.webp.futurama2,
      tirageFuturama2.futurama2_1,
      tirageFuturama2.futurama2_2,
      tirageFuturama2.futurama2_3,
      tirageFuturama2.futurama2_4,
    ],
  },
  {
    id: 6,
    category: "originaux",
    title: "Futurama 3",
    serie: "Futurama",
    piece: "3ᵉ",
    date: "2023",
    dimension: "medium-formats",
    format: "50 x 70 cm",
    price: 250,
    papier: PAPER_TYPES.FINE_ART_COTTON,
    images: [
      originalFuturama.webp.futurama3,
      tirageFuturama3.futurama3_1,
      tirageFuturama3.futurama3_2,
      tirageFuturama3.futurama3_3,
      tirageFuturama3.futurama3_4,
    ],
  },
];

export const exhibitionData = [
  {
    date: "2024",
    title: "Exhibition 'Collective MIFAC' - Espace Franquin",
    location: "Angoulême",
  },
  {
    date: "2024",
    title: "Exhibition 'Instinctual' - Distillerie NAUD",
    location: "Pons",
  },
  {
    date: "2023",
    title: "Exhibition at the 'Au Fil de l’Art' Festival",
    location: "Jarnac",
  },
  {
    date: "2023",
    title: "Exhibition 'Margritt' - Chez Demois",
    location: "Bellevigne",
  },
  {
    date: "2023",
    title: "Solo Exhibition - The Ten Years of Chabram2 - Chabram2",
    location: "Touzac",
  },
  {
    date: "2020",
    title: "Solo Exhibition – 'Instinctual' - La Ruche",
    location: "Nantes",
  },
  {
    date: "2016",
    title: "Solo Exhibition – 'Les Prémices' - EESAB",
    location: "Brest",
  },
  {
    date: "2015",
    title:
      "Participation in the 'Giant Awakening Rug' project under the supervision of designer Elise Auffray",
    location: "Brest",
  },
  {
    date: "2014",
    title:
      "Group Exhibition – 'The Posters' - Screen Printing Workshop - EESAB",
    location: "Brest",
  },
  {
    date: "2013",
    title:
      "Presentation of personal works in the exhibition 'Thinking, through, making' - EESAB",
    location: "Brest",
  },
];

export const activityData = [
  {
    id: 0,
    date: "2024",
    title: "Portrait Series - Selection of 7 Artists Worldwide - BIC CREATOR",
    location: "Malaville",
  },
  {
    id: 1,
    date: "2023",
    title: "Workshop at the Red Cross - Workshop with early childhood learners",
    location: "Angoulême",
  },
  {
    id: 2,
    date: "2023",
    title: "Collaboration with the brand 'BIC'",
    location: "Paris",
  },
  {
    id: 3,
    date: "2023",
    title:
      "Participation – Artist Portrait - End-of-Year Project for an Art Therapy Student",
    location: "Bellevigne",
  },
  {
    id: 4,
    date: "2023",
    title:
      "Guest Artist – Creating Workshops for Schools in the Greater Cognac Area",
    location: "Cognac",
  },
  {
    id: 5,
    date: "2020",
    title: "Solo Exhibition – 'Instinctual' - La Ruche",
    location: "Nantes",
  },
  {
    id: 6,
    date: "2022",
    title:
      "Artistic Participation - Visual Proposal for Cup - La Friche des Ponts",
    location: "Limoges",
  },
  {
    id: 7,
    date: "2021",
    title:
      "Artistic Participation – 'Bibulle in the Urban Environment' - La Friche des Ponts",
    location: "Limoges",
  },
  {
    id: 8,
    date: "2017",
    title:
      "Participation in Workshops - Regional Meetings - Christchurch Artists",
    location: "New Zealand",
  },
  {
    id: 9,
    date: "2017",
    title:
      "Guest Artist for Elderly People with Alzheimer's - Day Care Kerélys",
    location: "Rennes",
  },
  {
    id: 10,
    date: "2015",
    title: "Gallery Intern – Galerie Colette Clavreul",
    location: "Paris 3rd",
  },
  {
    id: 11,
    date: "2014",
    title: "Preparation and Participation in a Group Exhibition",
    location: "Brest",
  },
];

export const awardsReviewsData = [
  {
    date: "2023",
    title:
      "Article from December 8 - Charente Libre - 'Jarnac: A Tour and Mediation at Au Fil de l’Art'",
    location: "Jarnac",
  },
  {
    date: "2023",
    title:
      "Article from August 19 - Charente Libre - 'In Bellevigne, an Exhibition in an Intimate Setting'",
    location: "Bellevigne",
  },
  {
    date: "2023",
    title:
      "Article from June 10 – Living in Cognac Land - 'The Ten Years of Chabram2'",
    location: "Bellevigne",
  },
  {
    date: "2023",
    title:
      "Article from June 10 – Charente Libre - 'Ten Years of Art in Rural Areas'",
    location: "Jarnac",
  },
  {
    date: "2023",
    title:
      "Article from April 19 - Charente Libre by Gilles Biolley - Greater Cognac West Charente - 'Margritt Martinet's Graphic Invasion is Preparing in Malaville'",
    location: "Jarnac",
  },
  {
    date: "2020",
    title:
      "Certificate of Artistic Merit - Participation in the Luxembourg Art Prize Competition",
    location: "Luxembourg",
  },
];
