<?php
	namespace App\Controller;
	
	use Doctrine\ORM\Mapping\ReflectionEmbeddedProperty;
	use Symfony\Component\HttpFoundation\Response;
	
	class Pages {
		
		public function welcome() {
			return new Response(
				'
						<html>
						<body>
						<header>
							<h1>Symfony Framework</h1>
						    <h2>Welcome</h2>
						    <ul>
								<li><a href="/Index">HOME</a></li>
								<li><a href="/About">ABOUT</a></li>
								<li><a href="/Contact">CONTACT</a></li>
								<li><a href="/Thank-You">THANK YOU</a></li>
							</ul>
						</header>
						</body>
						</html>'
			);
		}
	}

?>
