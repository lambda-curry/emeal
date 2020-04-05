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
          <CopyToClipboard
            copyText={`${embedComment}\n${embedCode}`}
          ></CopyToClipboard>
          <code>
            {embedComment}
            <br />
            {embedCode}
          </code>
        </div>
      </div>
    </div>
  );
};
