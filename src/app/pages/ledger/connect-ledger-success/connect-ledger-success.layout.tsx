import { FiCheck } from 'react-icons/fi';
import { color, Box, Stack } from '@stacks/ui';

import { BaseDrawer } from '@app/components/drawer';
import { Caption } from '@app/components/typography';
import ConnectLedgerSuccess from '@assets/images/onboarding/ledger/connect-ledger-success.png';

import { ConnectLedgerTitle } from '../components/connect-ledger-title';

interface ConnectLedgerSuccessLayoutProps {
  onCancelConnectLedger(): void;
}
export function ConnectLedgerSuccessLayout(props: ConnectLedgerSuccessLayoutProps) {
  const { onCancelConnectLedger } = props;

  return (
    <BaseDrawer title={<Box />} isShowing onClose={onCancelConnectLedger}>
      <Stack alignItems="center" pb="loose" px="loose" spacing="loose" textAlign="center">
        <Box width="267px">
          <img src={ConnectLedgerSuccess} />
        </Box>
        <ConnectLedgerTitle />
        <Stack alignItems="center" color={color('feedback-success')} isInline mb="base">
          <FiCheck />
          <Caption color="inherited">Connected!</Caption>
        </Stack>
      </Stack>
    </BaseDrawer>
  );
}
