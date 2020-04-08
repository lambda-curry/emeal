import React from 'react';
import { useSession } from '../state/session/SessionProvider';
import { selectCurrentProject } from '../state/session/SessionSelectors';
import './embed-page.scss';
import { CopyToClipboard } from '../components/CopyToClipboard';

export const EmbedPage = () => {
  const { state } = useSession();
  const currentProject = selectCurrentProject(state);
  const embedComment = `<!-- emeal.me coupon pop-up embed script -->`;
  const embedCode = `<script async data-coupon-id="${currentProject.id}" src="https://app.emeal.me/modal/dist/emeal-embed.min.js"></script>`;

  return (
    <div className='page embed'>
      <div className='page-container'>
        <div className='page-item'>
          <div className='embed-code'>
            <code>
              {embedComment}
              <br />
              {embedCode}
            </code>
            <CopyToClipboard
              copyText={`${embedComment}\n${embedCode}`}
            ></CopyToClipboard>
          </div>
          {/* TODO: Hook up the Click here to show help. */}
          <div className='embed-info'>
            Copy the snippet above and add it anywhere you wish on your landing
            page.
            <br />
            Need additional help? Email&nbsp;us&nbsp;at&nbsp;
            <a href='mailto:support@emeal.me'>support@emeal.me</a>.
          </div>
        </div>
      </div>
    </div>
  );
};
