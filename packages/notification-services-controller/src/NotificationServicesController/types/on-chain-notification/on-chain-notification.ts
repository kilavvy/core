import type { components } from './schema';
import type { TRIGGER_TYPES } from '../../constants/notification-schema';
import type { Compute } from '../type-utils';

export type Data_MetamaskSwapCompleted =
  components['schemas']['Data_MetamaskSwapCompleted'];
export type Data_LidoStakeReadyToBeWithdrawn =
  components['schemas']['Data_LidoStakeReadyToBeWithdrawn'];
export type Data_LidoStakeCompleted =
  components['schemas']['Data_LidoStakeCompleted'];
export type Data_LidoWithdrawalRequested =
  components['schemas']['Data_LidoWithdrawalRequested'];
export type Data_LidoWithdrawalCompleted =
  components['schemas']['Data_LidoWithdrawalCompleted'];
export type Data_RocketPoolStakeCompleted =
  components['schemas']['Data_RocketPoolStakeCompleted'];
export type Data_RocketPoolUnstakeCompleted =
  components['schemas']['Data_RocketPoolUnstakeCompleted'];
export type Data_ETHSent = components['schemas']['Data_ETHSent'];
export type Data_ETHReceived = components['schemas']['Data_ETHReceived'];
export type Data_ERC20Sent = components['schemas']['Data_ERC20Sent'];
export type Data_ERC20Received = components['schemas']['Data_ERC20Received'];
export type Data_ERC721Sent = components['schemas']['Data_ERC721Sent'];
export type Data_ERC721Received = components['schemas']['Data_ERC721Received'];

// Web3Notifications
export type Data_AaveV3HealthFactor =
  components['schemas']['Data_AaveV3HealthFactor'];
export type Data_EnsExpiration = components['schemas']['Data_EnsExpiration'];
export type Data_LidoStakingRewards =
  components['schemas']['Data_LidoStakingRewards'];
export type Data_RocketpoolStakingRewards =
  components['schemas']['Data_RocketpoolStakingRewards'];
export type Data_NotionalLoanExpiration =
  components['schemas']['Data_NotionalLoanExpiration'];
export type Data_SparkFiHealthFactor =
  components['schemas']['Data_SparkFiHealthFactor'];

type Notification =
  | components['schemas']['WalletNotification']
  | components['schemas']['Web3Notification'];
type ConvertToEnum<Kind> = {
  [K in TRIGGER_TYPES]: Kind extends `${K}` ? K : never;
}[TRIGGER_TYPES];

/**
 * Type-Computation.
 * 1. Adds a `type` field to the notification, it converts the schema type into the ENUM we use.
 * 2. It ensures that the `data` field is the correct Notification data for this `type`
 * - The `Compute` utility merges the intersections (`&`) for a prettier type.
 */
type NormalizeNotification<
  N extends Notification,
  NotificationDataKinds extends string = NonNullable<N['data']>['kind'],
> = {
  [K in NotificationDataKinds]: Compute<
    Omit<N, 'data'> & {
      type: ConvertToEnum<K>;
      data: Extract<N['data'], { kind: K }>;
    }
  >;
}[NotificationDataKinds];

export type OnChainRawNotification = Compute<
  | NormalizeNotification<components['schemas']['WalletNotification']>
  | NormalizeNotification<components['schemas']['Web3Notification']>
>;

export type UnprocessedOnChainRawNotification = Notification;

export type OnChainRawNotificationsWithNetworkFields = Extract<
  OnChainRawNotification,
  { data: { network_fee: unknown } }
>;
