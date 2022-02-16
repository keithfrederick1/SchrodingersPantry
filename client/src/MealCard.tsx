// import * as React from 'react';
// import { Card, Button } from 'react-bootstrap';

// interface MealProps {
//   meal?: string
// }

// export default function MealCard ({ meal }: MealProps) {
//   return (
//     <Card style={{ width: '18rem' }}>
//   <Card.Img variant="top" src="holder.js/100px180" />
//   <Card.Body>
//     <Card.Title>Recipe</Card.Title>
//     <Card.Text>
//       recipe description
//     </Card.Text>
//     <Button variant="primary">See more</Button>
//   </Card.Body>
// </Card>
//   )
// }







///------------MATERIAL UI IMPLEMENTATION--------------//
import * as React from 'react';
import { styled } from '@mui/material/styles';
import  Card  from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SearchYoutube from './SearchYoutube';


//-----for card chevron expansion functionality-----/
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
//-----------------------------------------------------//

interface CardProps {
  recipe?: { name: string, id: number, description: string, instructions: string, imageURL: string}
}

//the search component should map over the results, creating a meal card for each recipe, 
export default function MealCard({ recipe }: CardProps) {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  //you only want to make an axios request for the meal that is selected, not for each meal card on the screen, wait until user clicks to assign, and use that recipes name to make the request by passing down the meal prop from state to the Search Youtube component
  const [meal, setMeal] = React.useState<string>('');//recipe.name
  const handleExpandClick = () => {
    console.log(expanded);
    setExpanded(!expanded);
  };

  // const handleCardClick = (event) => {
  // // !!!!!!!need to find type for event for this to functon!!!!!
  // // set state of meal to the clicked cards title
  //   setMeal(event.target.value.title);
  // }

  return (
    <Card sx={{ maxWidth: 345 }} //{onClick={handleCardClick}}
    >
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R 
        //     {/* this should be user profile's first letter */}
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella" //recipe.name
      />
      <CardMedia
        component="img" 
        height="194"
        image="/static/images/cards/paella.jpg" 
        alt="Paella dish" //recipe.name
        // image for dish from api
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
          {/* recipe.description*/}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {/* send post request to that user's favorites on click */}
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          {/* allow users to send to friends */}
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="tutorial">
          {/* allow users to play most relevant tutorial from youtube */}
          <PlayCircleIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Instructions:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
            {/* recipe.instructions */}
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            {/* instructions pt.2 */}
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
            {/* instructions pt 3 */}
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
            {/* instructions pt 4 */}
          </Typography>
          <SearchYoutube meal={meal}/>
        </CardContent>
      </Collapse>
    </Card>
     );
    }
