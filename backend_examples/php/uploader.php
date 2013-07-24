<?php
header('Content-type: application/json');

$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& in_array($extension, $allowedExts))
  {
  if ($_FILES["file"]["error"] > 0)
    {
      $return_data = array(
                    'error' =>  true,
                    'data'   =>  $_FILES["file"]["error"]
                  );
      echo json_encode($return_data);
    }
  else
    {

    if (file_exists("uploads/" . $_FILES["file"]["name"]))
      {
        $return_data = array(
          'error' =>  true,
          'data'   =>  $_FILES["file"]["name"] . " already exists. "
        );
        echo json_encode($return_data);
      }
    else
      {
      $rand_number = rand(1000000,9000000);
      move_uploaded_file($_FILES["file"]["tmp_name"],
      "uploads/" . $rand_number . $_FILES["file"]["name"]);

        $return_data = array(
            'error' =>  false,
            'data'   =>  array (
              'file' => "uploads/" . $rand_number . $_FILES["file"]["name"],
              'token' => $_REQUEST['token']
            )
          );
        echo json_encode($return_data);

      }
    }
  }
else
  {
    $return_data = array(
      'error' =>  true,
      'data'   =>  'Invalid File'
    );
    echo json_encode($return_data);
  }
?>