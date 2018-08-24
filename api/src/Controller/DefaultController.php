<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Post;
use App\Entity\Users;

class DefaultController extends AbstractController
{
    /**
     * @Route("/feed", name="feed")
     */
    public function index()
    {
    	// Get rid of circular reference error
	    $encoder = new JsonEncoder();
	    $encoders = array($encoder);
	    $normalizer = new ObjectNormalizer();
	    $normalizer->setCircularReferenceLimit(1);
		// Add Circular reference handler
	    $normalizer->setCircularReferenceHandler(function ($object) {
		    return $object->getId();
	    });
	    $normalizers = array($normalizer);
	    $serializer = new Serializer($normalizers, $encoders);
    	
	    // Get posts from database and serialize them into a response object
	    $posts = $this->getDoctrine()->getRepository(Post::class)->findAll();
	    $response = new Response($serializer->serialize($posts, 'json'));
	    
	    // Return the response
	    return $response;
    }
	
	/**
	 * @Route("/feed/{userId}", name="show_user_posts")
	 */
	public function showUserPosts($userId) {
		// Get rid of circular reference error
		$encoder = new JsonEncoder();
		$encoders = array($encoder);
		$normalizer = new ObjectNormalizer();
		$normalizer->setCircularReferenceLimit(1);
		// Add Circular reference handler
		$normalizer->setCircularReferenceHandler(function ($object) {
			return $object->getId();
		});
		$normalizers = array($normalizer);
		$serializer = new Serializer($normalizers, $encoders);
		
		$user = $this->getDoctrine()->getRepository(Users::class)->findOneBy(['id' => $userId]);
		$userPosts = $user->getPosts();
		
		$response = new Response($serializer->serialize($userPosts, 'json'));
		
		// Return Response
		return $response;
	}
	
	/**
	 * @Route("/post", name="create_post", methods="POST")
	 */
	public function createPost(Request $request) {
		$user = $this->getDoctrine()->getRepository(Users::class)->findOneBy(['id' => $request->request->get('user')]);
		$post = new Post();
		
		$em = $this->getDoctrine()->getManager();
		$post->setText($request->request->get('text'));
		$post->setUsers($user);
		$em->persist($post);
		$em->flush();
		
		
		return new Response($request->request->get('text'));
	
	}
	
	/**
	 * @Route("/user", name="create_user", methods="POST")
	 */
	public function createUser(Request $request) {
		$user = new Users();
		
		$em = $this->getDoctrine()->getManager();
		$user->setUsername($request->request->get('username'));
		$user->setEmail($request->request->get('email'));
		$user->setPhone($request->request->get('phone'));
		$em->persist($user);
		$em->flush();
		
		return new Response('Added new User');
	}
	
	/**
	 * @Route("/post/{id}", name="update", methods="PUT")
	 */
	public function updatePost(Request $request, $id) {
		$post = $this->getDoctrine()->getRepository(Post::class)->findOneBy(['id' => $id]);
		$post->setLikes($post->getLikes() + 1);
		$em = $this->getDoctrine()->getManager();
		$em->persist($post);
		$em->flush();
		
		return new Response('updated likes');
	}
	
	/**
	 * @Route("/post/{id}",name="delete", methods="DELETE")
	 */
	public function deletePost($id) {
		$post = $this->getDoctrine()->getRepository(Post::class)->findOneBy(['id' => $id]);
		
		$em = $this->getDoctrine()->getManager();
		$em->remove($post);
		$em->flush();
		
		return new Response('deleted post id: ' . $id);
	}
}
