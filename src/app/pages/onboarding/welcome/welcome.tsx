import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRouteHeader } from '@app/common/hooks/use-route-header';
import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { useOnboardingState } from '@app/common/hooks/auth/use-onboarding-state';
import { Header } from '@app/components/header';
import { RouteUrls } from '@shared/route-urls';
import { useHasAllowedDiagnostics } from '@app/store/onboarding/onboarding.hooks';
import { WelcomeLayout } from './welcome.layout';
import { useKeyActions } from '@app/common/hooks/use-key-actions';
import Transport from '@ledgerhq/hw-transport-webusb';
import StacksApp from '@zondax/ledger-blockstack';
import { AddressVersion } from '@stacks/transactions';
import { useDispatch } from 'react-redux';
import { keySlice } from '@app/store/keys/key.slice';
import toast from 'react-hot-toast';

export const WelcomePage = memo(() => {
  const [hasAllowedDiagnostics] = useHasAllowedDiagnostics();
  const navigate = useNavigate();
  const { decodedAuthRequest } = useOnboardingState();
  const analytics = useAnalytics();
  const keyActions = useKeyActions();

  const dispatch = useDispatch();

  useRouteHeader(<Header hideActions />);

  const [isGeneratingWallet, setIsGeneratingWallet] = useState(false);

  const startOnboarding = useCallback(async () => {
    setIsGeneratingWallet(true);

    keyActions.generateWalletKey();

    void analytics.track('generate_new_secret_key');

    if (decodedAuthRequest) {
      navigate(RouteUrls.SetPassword);
    }
    navigate(RouteUrls.BackUpSecretKey);
  }, [keyActions, analytics, decodedAuthRequest, navigate]);

  useEffect(() => {
    if (hasAllowedDiagnostics === undefined) navigate(RouteUrls.RequestDiagnostics);
    return () => setIsGeneratingWallet(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button
        onClick={async () => {
          const STX_DERIVATION_PATH = `m/44'/5757'/0'/0/0`;
          console.log('Ledger connected');
          const transport = await Transport.create();
          const stacks = new StacksApp(transport);
          const result = await stacks.getAppInfo();
          console.log(result);

          const mainnetPublicKey = await stacks.getAddressAndPubKey(
            STX_DERIVATION_PATH,
            AddressVersion.MainnetSingleSig
          );
          console.log(mainnetPublicKey);
          console.log(mainnetPublicKey.publicKey.toString('hex'));
          const testnetPublicKey = await stacks.getAddressAndPubKey(
            STX_DERIVATION_PATH,
            AddressVersion.TestnetSingleSig
          );
          console.log(testnetPublicKey);
          console.log(testnetPublicKey.publicKey.toString('hex'));
          if (mainnetPublicKey.publicKey) {
            toast.success('Pulled keys from device');
            dispatch(
              keySlice.actions.createLedgerWallet({
                type: 'ledger',
                id: 'default',
                publicKeys: [mainnetPublicKey.publicKey.toString('hex')],
              })
            );
            navigate(RouteUrls.Home);
          }
        }}
      >
        open ledger
      </button>
      <WelcomeLayout
        isGeneratingWallet={isGeneratingWallet}
        onStartOnboarding={() => startOnboarding()}
        onRestoreWallet={() => navigate(RouteUrls.SignIn)}
      />
    </>
  );
});
