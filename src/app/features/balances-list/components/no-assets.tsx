import { Stack, StackProps } from '@stacks/ui';

import { Caption } from '@app/components/typography';
import NoFunds from '@assets/images/no-funds.png';
import { OnboardingSelectors } from '@tests/integration/onboarding/onboarding.selectors';
import { SecondaryButton } from '@app/components/secondary-button';

interface NoAssetProps extends StackProps {
  address: string;
  onFundAccount(): void;
}
export function NoAssets({ address, onFundAccount, ...props }: NoAssetProps) {
  return (
    <Stack
      py="extra-loose"
      spacing="extra-loose"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <img src={NoFunds} />
      <Caption maxWidth="248px" textAlign="center">
        This is where you’ll see your balances. Get some STX to get started.
      </Caption>
      <SecondaryButton
        data-testid={OnboardingSelectors.NoAssetsFundAccountLink}
        height="36px"
        onClick={onFundAccount}
      >
        Fund your account
      </SecondaryButton>
    </Stack>
  );
}
