import React from 'react';

import ProjectContext from './projects/projectContext';
import ProjectDetailsLayout from './projectDetailsLayout';

class ProjectDetails extends React.Component {
  render() {
    let {projectId, orgId} = this.props.params;
    return (
      <ProjectContext orgId={orgId} projectId={projectId}>
        <ProjectDetailsLayout>{this.props.children}</ProjectDetailsLayout>
      </ProjectContext>
    );
  }
}

export default ProjectDetails;
