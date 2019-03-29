import React from 'react'
import Typography from '@material-ui/core/Typography';

class Footer extends React.Component {
  render() {
    const style = {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }

    return (
      <footer style={style}>
        <Typography variant="h6">
          Copyright @ Adam & Alvin's Fun Lab
        </Typography>
      </footer>
    )
  }
}

export default Footer