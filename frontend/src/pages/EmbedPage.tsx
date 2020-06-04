import React, {
  ComponentType,
  ElementType,
  useState,
  ReactPropTypes,
} from 'react';
import { useSession } from '../state/session/SessionProvider';
import { selectCurrentProject } from '../state/session/SessionSelectors';
import './embed-page.scss';
import { CopyToClipboard } from '../components/CopyToClipboard';
import classNames from 'classnames';
import { Icon, IconNames } from '../components/Icon';

const EmbedTab = ({
  active,
  icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: IconNames;
  title: string;
  description: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => (
  <button
    onClick={onClick}
    className={classNames('embed-tab', active ? 'active' : '')}
  >
    <Icon name={icon} />
    <div className='embed-tab-content'>
      <span className='embed-tab-title'>{title}</span>
      <span className='embed-tab-description'>{description}</span>
    </div>
  </button>
);

export const EmbedPage = () => {
  const { state } = useSession();
  const [embedType, setEmbedType] = useState<'popup' | 'static'>('popup');
  const currentProject = selectCurrentProject(state);

  const embedContent = {
    popup: {
      embedComment: `<!-- emeal.me coupon pop-up embed script -->`,
      embedCode: `<script async data-coupon-id="${currentProject.id}" src="https://app.emeal.me/modal/dist/emeal-embed.min.js"></script>`,
    },
    static: {
      embedComment: `<!-- emeal.me coupon static embed script -->`,
      embedCode: `<script async data-coupon-id="${currentProject.id}" src="https://app.emeal.me/modal/dist/static-embed.min.js"></script>`,
    },
  };

  const embedComment = embedContent[embedType].embedComment;
  const embedCode = embedContent[embedType].embedCode;

  return (
    <div className='page embed'>
      <div className='page-container'>
        <div className='page-item'>
          <div className='embed-tab-row'>
            <EmbedTab
              onClick={() => setEmbedType('popup')}
              active={embedType === 'popup'}
              icon='popup'
              title='Pop-up'
              description='Appears one time'
            />
            <EmbedTab
              onClick={() => setEmbedType('static')}
              active={embedType === 'static'}
              icon='static_embed'
              title='Static Object'
              description='Always visible on page'
            />
          </div>
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
            <a href='mailto:hello@emeal.me'>hello@emeal.me</a>.
          </div>
        </div>
      </div>
    </div>
  );
};
