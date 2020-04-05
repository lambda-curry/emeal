import React, { useState } from 'react';
import ClipboardJS from 'clipboard';

type CopyStates = 'copyable' | 'copied' | 'error';

export const CopyToClipboard = ({ copyText }: { copyText: string }) => {
  const [copyState, setCopyState] = useState<CopyStates>('copyable');

  const clipboard = new ClipboardJS('.copy-to-clipboard');

  clipboard.on('success', (e) => {
    setCopyState('copied');
    setTimeout(() => setCopyState('copyable'), 1000);
    e.clearSelection();
  });

  clipboard.on('error', (e) => setCopyState('error'));

  const copyButtonText = {
    copied: 'Copied Successfully!',
    copyable: 'Copy to clipboard',
    error: 'Error copying, click to try again.',
  };

  return (
    <button
      type='button'
      className={'copy-to-clipboard button-primary'}
      data-clipboard-text={copyText}
      disabled={copyState === 'copied'}
    >
      {copyButtonText[copyState]}
    </button>
  );
};
