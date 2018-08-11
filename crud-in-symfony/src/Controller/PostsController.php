<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Tests\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Post;
use App\Form\PostType;
use App\Entity\Comment;
use App\Form\CommentType;

///**
// * @Route("/posts)
// */

class PostsController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index()
    {
	    $posts = $this->getDoctrine()->getRepository(Post::class)->findAll();
	    return $this->render('posts/index.html.twig', [
	    	'posts' => $posts
	    ]);
    }
    
    /**
     * Create a new post
     *
     * @Route("/new", name="post_new")
     */
    function create(Request $request){
	    $post = new Post();
	    $form = $this->createForm(PostType::class, $post);
	    $form->handleRequest($request);
	    
	    if ($form->isSubmitted() and $form->isValid()){
		    $em = $this->getDoctrine()->getManager();
		    $em->persist($post);
		    $em->flush();
		    return $this->redirectToRoute('index');
	    }
	    
	    return $this->render('posts/new.html.twig', [
	    	'form' => $form->createView(),
	    ]);
	    
    }
	/**
	 * @Route("/{id}", name="show")
	 */
	public function show(Post $post, Request $request) {
		$comment = new Comment();
		$form = $this->createForm(CommentType::class, $comment);
		$form->handleRequest($request);
		
		if ($form->isSubmitted() and $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$comment->setPost($post);
			$em->persist($comment);
			$em->flush();
			
			return $this->redirectToRoute('show', [
				'id'=>$post->getId(),
			]);
		}
		
		return $this->render('posts/show.html.twig',[
			'post' => $post,
			'comment_form' => $form->createView(),
		]);
	}
	
	/**
	 * @Route("/{id}/edit", name="edit")
	 */
	public function edit(Request $request, Post $post) {
		$form = $this->createForm(PostType::class, $post);
		$form->handleRequest($request);
		
		if($form->isSubmitted() and $form->isValid()) {
			$this->getDoctrine()->getManager()->flush();
			
			return $this->redirectToRoute('show', [
				'id' => $post->getId()
			]);
		}
		
		return $this->render('post/new.html.twig', [
			'form' => $form->createView(),
		]);
	}
	
	/**
	 * @Route("/{post_id}/delete/{id}", name="delete")
	 */
	public function delete(Request $request, Comment $comment, $post_id) {
		
		$em = $this->getDoctrine()->getManager();
		$em->remove($comment);
		$em->flush();
		
		return $this->redirectToRoute('show',[
			'id' => $post_id
		] );
	}
}
