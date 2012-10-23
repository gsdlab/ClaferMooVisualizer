<?php

header('X-Content-Type-Options: nosniff');

$cacheFile = "cache.txt";
$use_cache = false;

function convertHtmlTags($input) {
  $in_tag=false;
  $in_var=false;
  
  $length = strlen($input);

  for ($i=0;$i<$length;$i++) 
    {
      $char=$input[$i];
      if ($in_tag) {
    if ($in_var) {
      if ($char == '"') {
        $in_var = false;
      }
      $output .= $char;
    }
    else {
      if ($char == '"') {
        $in_var = true;
      }
      else if ($char == '>') {
        $in_tag = false;
      }
      $output .= strtolower($char);
    }
      }
      else {
    if ($char == '<') {
      $in_tag = true;
    }
    $output .= $char;
      }
    }

  return $output;
}

//header('X-Content-Type-Options: nosniff');
//header('Content-type: text/plain');

if ($use_cache)
{
	$data = file_get_contents($cacheFile) ; // output cache.
	$data = htmlspecialchars ($data);
	echo $data;
	return;
}

$uploaddir = 'Files/';
$uploadfile = $uploaddir . basename($_FILES['file']['name']);

//print_r($_FILES);

if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
//    echo "File is valid, and was successfully uploaded.\n";
} else {
    echo "Possible file upload attack!\n";
	die();
}

$path = "ClaferMoo/spl_datagenerator/";
$python_file_name = "IntegratedFeatureModelOptimizer.py";
$file_name = $uploadfile;

$output = "";
unset($output);
$result = 0;

$command = "\"C:/Python27/python.exe\" ClaferMoo/spl_datagenerator/IntegratedFeatureModelOptimizer.py ".$file_name;
$exe_result = exec($command, $output, $result);

$data = "Return code = ".$result."\n".implode("\n", $output).
	"====="
	.
	file_get_contents(preg_replace('"\.cfr$"', '.xml', $file_name)); // output XML file too.	

$data = convertHtmlTags($data);
	
$fh = fopen($cacheFile, 'w') or die("can't open file");
fwrite($fh, $data);
fclose($fh);	
	
echo htmlspecialchars ($data);

?>