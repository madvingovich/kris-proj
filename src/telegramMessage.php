<?

$token = "812128921:AAETY0TELLQGM8gruUUnnHoeq6Vok11AoMo"; //наш токен от telegram bot -а
$chatid = "442221212"; //ИД чата telegrm

$name = $_GET['name'];
$tel = $_GET['tel'];
$mail = $_GET['mail'];
$text = $_GET['text'];

$mess = '';

if(!empty($name)) $mess .= "\nИмя: $name";
else sendHeaderError('Поле "Имя" не заполнено!');

if(!empty($tel) && preg_match('/\d{9}/si', str_replace(' ', '', $tel))) $mess .= "\nТел.: $tel";
else sendHeaderError('Поле "Номер" заполнено не верно!');

if(!empty($mail) && preg_match('/.+@.+\..+/si', $mail)) $mess .= "\nПочта: $mail";

if(!empty($text)) $mess .= "\nТекст: $text";


$tbot = file_get_contents("https://api.telegram.org/bot".$token."/sendMessage?chat_id=".$chatid."&text=".urlencode($mess));

echo 'Письмо отправлено, в ближайшее время я с вами свяжусь:)';


function sendHeaderError($errorText)
{
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    die($errorText);
}
?>