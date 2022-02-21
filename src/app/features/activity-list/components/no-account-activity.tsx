import { Stack } from '@stacks/ui';

import { Caption } from '@app/components/typography';
import NoActivity from '@assets/images/no-activity.svg';

export function NoAccountActivity() {
  return (
    <Stack py="extra-loose" spacing="extra-loose" justifyContent="center" alignItems="center">
      <img src={NoActivity} />
      <Caption maxWidth="23ch" textAlign="center">
        No activity yet.
      </Caption>
    </Stack>
  );
}
