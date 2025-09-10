const fs = require('fs');
const path = require('path');

// List of all images
const images = [
  'HomeBackground.png',
  'notification.png',
  'OverallBackground.png',
  'from_to_icon.png',
  'ic_calendar.png',
  'From.png',
  'To.png',
  'From_2X.png',
  'To_2X.png',
  'ic_swap.png',
  'ic_back.png',
  'aeroplaneIcon.png',
  'Accordion-Icon-Container.png',
  'Contact_us.png',
  'x_icon.png',
  'Dustbin.png',
  'ic_dot_indicator.png',
  'ic_plane.png',
  'ic_seat.png',
  'ic_down_arrow.png',
  'cockpitBackground.png',
  'folder.png',
  'Check_Box.png',
  'Check_Empty_Box.png',
  'arrow_forward.png',
  'arrow_down.png',
  'arrow_up.png',
  'ic_arrow_right.png',
  'dragIcon.png',
  'ic_menu_arrow.png',
  'menuDown.png',
  'ic_info.png',
  'ic_plane.png',
  'ic_slider.png',
  'top_background.png',
  'beach.png',
  'firstaid.png',
  'coffee.png',
];

// Path to your project directory
const projectDirectory = path.join(__dirname, '../');

// Function to search for image usage in the project
const findUnusedImages = () => {
  const unusedImages = [];

  images.forEach((image) => {
    const searchCommand = `grep -rl '${image}' ${projectDirectory}`;

    try {
      const result = require('child_process').execSync(searchCommand).toString();

      if (!result) {
        unusedImages.push(image);
      }
    } catch (error) {
      unusedImages.push(image); // If grep fails, the image is likely unused
    }
  });

};

findUnusedImages();
