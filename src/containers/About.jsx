import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';

const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    width: 300,
  },
});

const About = classes => (
  <div className={classes.aboutContainer}>
    <Header />
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '70vh' }}
    >
      <Grid item xs={8}>
        <p>Hi Listener,</p>
        <p>
          This music service was developed as an alternative to traditional
          streaming services one of the main advantages of which besides a huge
          music library is ability to share music across devices. Developed for
          those who are like the idea of streaming services but who have a local
          music collection and don't want to buy a subscription to the streaming
          service.
        </p>
        <p>
          As for now, only decentralized version is supported. Project
          repository contains information about how to deploy your own service
          to AWS. But deployment is not limited to AWS and streaming service can
          be deployed anywehere you want.
        </p>
        <p>
          Also, as service deployed decentralized, it's easy to share your
          server with your friends. Just send a link to your service to friends
          you want to invite and here it is! Use the same username to listen and
          modify one playlist or use different usernames to have individual
          playlists.
        </p>
        <p>
          Star project on <a href="http://google.com">github</a> and feel free
          to propose any idea about future service development or to make PR.
        </p>
        <p>
          Best regards,
          <br />
          Maks
        </p>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(About);
