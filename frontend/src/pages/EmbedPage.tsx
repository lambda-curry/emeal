import React from 'react';
import { useSession } from '../state/session/SessionProvider';
import { selectCurrentProject } from '../state/session/SessionSelectors';
import './embed-page.scss';

export const EmbedPage = () => {
  const { state } = useSession();
  const currentProject = selectCurrentProject(state);

  return (
    <div className='page embed'>
      <div className='page-container'>
        <div className='page-item'>
          <h3>Embed Code</h3>
          <code>
            {`<script type="text/javascript">window.emealCouponId = '${currentProject.id}';</script>`}
            <br />
            {`<script async src="https://app.emeal.me/modal/dist/emeal-embed.min.js"></script>`}
          </code>
        </div>
      </div>
    </div>
  );
};
