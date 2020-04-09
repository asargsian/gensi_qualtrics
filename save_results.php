<?php

  $list = array (
    array(
      $_POST['nomem'],
      $_POST['q1'],
      $_POST['q2'],
      $_POST['q3_1'],
      $_POST['q4_1'],
      $_POST['q5_1'],
      $_POST['q6_1'],
      $_POST['q7_1'],
      $_POST['q8_1'],
      $_POST['q3_2'],
      $_POST['q4_2'],
      $_POST['q5_2'],
      $_POST['q6_2'],
      $_POST['q7_2'],
      $_POST['q8_2'],
      $_POST['q3_3'],
      $_POST['q4_3'],
      $_POST['q5_3'],
      $_POST['q6_3'],
      $_POST['q7_3'],
      $_POST['q8_3'],
      $_POST['q3_4'],
      $_POST['q4_4'],
      $_POST['q5_4'],
      $_POST['q6_4'],
      $_POST['q7_4'],
      $_POST['q8_4'],
      $_POST['q3_5'],
      $_POST['q4_5'],
      $_POST['q5_5'],
      $_POST['q6_5'],
      $_POST['q7_5'],
      $_POST['q8_5'],
      $_POST['q9_1'],
      $_POST['q9_2'],
      $_POST['q9_3'],
      $_POST['q10_1'],
      $_POST['q10_2'],
      $_POST['q10_3'])
  );

  $fp = fopen('results/data.csv', 'a');

  foreach ($list as $fields) {
    fputcsv($fp, $fields);
  }

  fclose($fp);

?>
