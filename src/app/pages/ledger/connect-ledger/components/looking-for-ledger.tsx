import { color, Spinner, Stack } from '@stacks/ui';

import { Caption } from '@app/components/typography';

export function LookingForLedger() {
  return (
    <Stack alignItems="center" isInline mb="base">
      <Spinner color={color('text-caption')} opacity={0.5} size="sm" />
      <Caption>Looking for your Ledger</Caption>
    </Stack>
  );
}
