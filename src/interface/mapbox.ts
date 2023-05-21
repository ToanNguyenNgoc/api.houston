export interface MapBoxResponse {
  type: string,
  query: string,
  features: MaxBoxFeature[]
}
export interface MaxBoxFeature {
  id: string,
  type: string,
  place_type: string[],
  relevance: number,
  properties: {
    wikidata: string,
    mapbox_id: string
  },
  text_vi: string,
  language_vi: string,
  place_name_vi: string,
  text: string,
  language: string,
  place_name: string,
  bbox: number[],
  center: number[],
  geometry: {
    type: string,
    coordinates: number[]
  },
  context: [
    {
      id: string,
      short_code: string,
      wikidata: string,
      mapbox_id: string,
      text_vi: string,
      language_vi: string,
      text: string,
      language: string
    }
  ]
}