export type IMsalIdTokenClaims = {
  aud?: string;
  iss?: string;
  iat?: number;
  nbf?: number;
  oid?: string;
  sub?: string;
  tid?: string;
  ver?: string;
  upn?: string;
  preferred_username?: string;
  login_hint?: string;
  emails?: string[];
  name?: string;
  nonce?: string;
  exp?: number;
  home_oid?: string;
  sid?: string;
  cloud_instance_host_name?: string;
  cnf?: {
    kid: string;
  };
  x5c_ca?: string[];
  ts?: number;
  at?: string;
  u?: string;
  p?: string;
  m?: string;
  roles?: string[];
  amr?: string[];
  idp?: string;
  auth_time?: number;
  tenant_region_scope?: string;
  tenant_region_sub_scope?: string;
} & {
  [key: string]: string | number | string[] | object | undefined | unknown;
};
