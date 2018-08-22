<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use App\Form\UserType;

class UserController extends Controller
{
  /**
  * @Route("/", name="user_index")
  */
  public function index()
  {
    $users = [];

    return $this->render('index.html.twig', ['users' => $users]);
  }

  /**
  * Create a new user.
  *
  * @Route("/new", name="user_new")
  */
  function createAction(Request $request) {
    $user = new User();
    $form = $this->createForm(UserType::class, $user);
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {

      return $this->redirectToRoute('user_show', array('username' => $user->username));
    }

    return $this->render('form.html.twig', ['form' => $form->createView()]);
  }

  /**
  * @Route("/{username}", name="user_show")
  */
  public function show(Request $request, $username)
  {
    $user = [];

    return $this->render('show.html.twig', ['user' => $user]);
  }


  /**
  * @Route("/{username}/edit", name="user_edit")
  */
  public function edit(Request $request, $username)
  {
    $form = $this->createForm(UserType::class, $user);
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
      return $this->redirectToRoute('user_show', ['username' => $username]);
    }

    return $this->render('form.html.twig', [
      'form' => $form->createView(),
    ]);
  }

  /**
  * @Route("/{username}/delete", name="user_delete")
  */
  public function delete(Request $request, $username)
  {

    return $this->redirectToRoute('user_index');
  }
}
