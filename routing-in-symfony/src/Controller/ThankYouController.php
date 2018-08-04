<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ThankYouController extends Controller
{
    /**
     * @Route("/thank/you", name="thank_you")
     */
    public function index()
    {
        return $this->render('thank_you/index.html.twig', [
            'controller_name' => 'ThankYouController',
        ]);
    }
}
