import { newModel } from "./model.request";

const CampaignEventsApi = newModel("campaign_events");

export const getCampaign = (campaignName: string, eventName = "") =>
  CampaignEventsApi.get({ route: `${campaignName}/${eventName}` });

export const isSubscribedInCampaign = async (name: string) =>
  getCampaign(name, "signin")
    .then(() => ({ isSubscribed: true }))
    .catch(() => ({ isSubscribed: false }));
