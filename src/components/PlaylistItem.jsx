import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import cocktail from './cocktail.png';
import Rateit from './Rateit.jsx'
import Hidden from '@material-ui/core/Hidden';

import axios from 'axios';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    width: '400px',
  },
  cover: {
    width: 200,
    height: 200,
  },
  mobile_card: {
    width: '100%',
  },
  mobile_media: {
    height: 200,
    //objectFit: 'cover',
  },
  mobile_actionarea: {
    width: '100%',
  }
});

class PlaylistItem extends React.Component {

  state = {};

  componentDidMount = () => {
    let container = this.props.data.navicontainer;
    let address = this.props.data.naviaddress;
    axios({
      url: `https://api.naviaddress.com/api/v1.5/Addresses/${container}/${address}?lang=ru`,
    }).then(resp => {
      let image = this.props.data.image_url;
      if (resp.data.result.cover) {
        if (resp.data.result.cover.length > 0) {
          image = resp.data.result.cover[0].image;
        }
      }
      this.setState({
        image: image,
        name: resp.data.result.name,
      });
    }).catch(err => {
      this.setState({
        image: this.props.data.image_url ? this.props.data.image_url : cocktail,
        name: this.props.data.name,
      });
    });
  }

  move_to = (url) => {
    this.props.history.push(url);
  }

  render = () => {
    const { classes } = this.props;

    return (
      <ListItem key={this.props.key}>
        <Hidden smDown implementation="css">
          <Card className={classes.card}>
            <CardActionArea onClick={() => this.move_to(`/unit/${this.props.data.id}`)}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography variant="headline">{this.state.name}</Typography>
                  <Typography variant="sLive from space album coverubheading" color="textSecondary">
                    <Rateit for_id={this.props.data.id} rating={this.props.data.rating}/>
                  </Typography>
                </CardContent>
              </div>
            </CardActionArea>
            <CardMedia
              className={classes.cover}
              image={this.state.image}
              title={this.state.name}
              />
          </Card>
        </Hidden>
        <Hidden mdUp>
          <Card className={classes.mobile_card}>
            <CardActionArea className={classes.mobile_actionarea} onClick={() => this.move_to(`/unit/${this.props.data.id}`)}>
              <CardMedia
                className={classes.mobile_media}
                image={this.state.image}
                title={this.state.name}
                />
              <CardContent>
                <Typography variant="headline">{this.state.name}</Typography>
                <Typography variant="subheading" color="textSecondary">
                  <Rateit for_id={this.props.data.id} rating={this.props.data.rating}/>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Hidden>
      </ListItem>
    )
  }
}

PlaylistItem.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  key: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PlaylistItem);
