import PropTypes from 'prop-types';
import React from 'react';
import SentryTypes from '../../../proptypes';

import GroupEventDataSection from '../eventDataSection';
import CSPContent from './cspContent';
import CSPHelp from './cspHelp';
import {t} from '../../../locale';

function getView(view, data) {
  switch (view) {
    case 'report':
      return <CSPContent data={data} />;
    case 'raw':
      return <pre>{JSON.stringify({'csp-report': data}, null, 2)}</pre>;
    case 'help':
      return <CSPHelp data={data} />;
    default:
      throw new TypeError(`Invalid view: ${view}`);
  }
}

class CSPInterface extends React.Component {
  static propTypes = {
    group: SentryTypes.Group.isRequired,
    event: SentryTypes.Event.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    let {data} = props;
    // hide the report-uri since this is redundant and silly
    data.original_policy = data.original_policy.replace(/(;\s+)?report-uri [^;]+/, '');

    this.state = {
      view: 'report',
      data,
    };
  }

  toggleView = value => {
    this.setState({
      view: value,
    });
  };

  render() {
    let {view, data} = this.state;
    let {group, event} = this.props;

    let title = (
      <div>
        <div className="btn-group">
          <a
            className={(view === 'report' ? 'active' : '') + ' btn btn-default btn-sm'}
            onClick={this.toggleView.bind(this, 'report')}
          >
            {t('Report')}
          </a>
          <a
            className={(view === 'raw' ? 'active' : '') + ' btn btn-default btn-sm'}
            onClick={this.toggleView.bind(this, 'raw')}
          >
            {t('Raw')}
          </a>
          <a
            className={(view === 'help' ? 'active' : '') + ' btn btn-default btn-sm'}
            onClick={this.toggleView.bind(this, 'help')}
          >
            {t('Help')}
          </a>
        </div>
        <h3>{t('CSP Report')}</h3>
      </div>
    );

    let children = getView(view, data);

    return (
      <GroupEventDataSection
        group={group}
        event={event}
        type="csp"
        title={title}
        wrapTitle={false}
      >
        {children}
      </GroupEventDataSection>
    );
  }
}

export default CSPInterface;
