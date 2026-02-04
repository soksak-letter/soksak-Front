export type GetConsentsResult = {
  termsAgreed: boolean;
  privacyAgreed: boolean;
  ageOver14Agreed: boolean;
  marketingPushAgreed: boolean;
  marketingEmailAgreed: boolean;
  marketingAgreed: boolean;
};

export type PatchConsentsBody = Partial<GetConsentsResult>;
export type PatchConsentsResult = { updated: boolean };

export type GetNotificationSettingsResult = {
  letter: boolean;
  marketing: boolean;
};

export type PatchNotificationSettingsBody = Partial<GetNotificationSettingsResult>;
export type PatchNotificationSettingsResult = { updated: boolean };

export type PostActivityBody = Record<string, never>; // {}
export type PostActivityResult = { message: string };
