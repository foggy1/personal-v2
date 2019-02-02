---
title: Handling async tasks in an Elixir API
date: "2019-02-02T16:51:00.000Z"
layout: post
draft: false
path: "/posts/handling-async-tasks-in-an-elixir-api"
category: "Programming"
tags:
    - "Stuff I don't hate"
    - "Concurrent programming"
    - "Programming"
    - "Elixir"
    - "Ruby"
    - "JavaScript"
description: "Working in elixir has been eye-opening and fun, especially whenever I have to do something distributed or asynchronous."
---

As everyone who has come into human contact with me over the last half-year knows, I adore Elixir. After over a year of tinkering with web server settings to try and find the optimal settings for a Rails server that was smoking from its ears at all times, my honeymoon phase with Ruby was over.

### **_Disclaimer: Use tools that help you succeed_**

_I spent a lot more time than I was planning on talking shit about Ruby and JavaScript below. Some of you will nod your heads, some of you will think I'm being reductive (I am), and some of you will put too much stock in it. I wouldn't be where I am without these languages or their communities, and the following is an expression of my own current programming/application-level philosophy more than anything else._

_In other words,_ **don't ever blame your tools**, _but be proud when you know well enough to assess their suitability for any given job._


## Async solutions: tales of extremes

Coming from a full-stack bootcamp background, my experience dealing with asynchronous tasks is a tale of polar opposites. On the one hand, there's JavaScript's event loop, a veritable Wild West of concurrency. On the other is Ruby, where any time I want to do anything asynchronous at all on my Rails server I have to sock a record in Postgres or Redis and have another, separate process paying attention to that queue on some interval.

While JavaScript's asynchronous nature has gotten a makeover with `async`/`await`, it's very new syntactic sugar, and any codebase that isn't adopting it as a wholesale standard has open loops that are intensely hard to conceptualize let alone manage once you've taken on their cost in your codebase. And where Javascript offers cheap but over-time expensive tech debt in this regard, Ruby offers... well, it's pretty much expensive all the time with respect to managing tasks, and even more expensive in that it almost always costs you in actual infrastructure.

## Elixir Tasks, where have you been all my life? (in erlang, actually)

Now the good stuff: [Elixir's `Task` module.](https://hexdocs.pm/elixir/Task.html)

If I've got a [Phoenix](https://phoenixframework.org/) API that accepts post requests to upsert a resource, here's what the relevant endpoint looks like:

```elixir
# repo/lib/fake_proj/resource_controller.ex

def upsert(conn, %{"id" => id, "info" => info}, params) do
  changes =
    params
    |> Map.take("info")

  changeset =
    case Repo.get(Resource, id) do
      nil ->
        %Resource{}

      resource ->
        resource
    end
    |> Resource.changeset(changes)

  case Repo.insert_or_update(changeset) do
    # We'll be zooming in on this block.
    {:ok, resource} ->
      json(conn, %{success: "yay!"})
      
    {:error, error} ->
      IO.inspect(error)
      # We're just going to let the endpoint 500
  end
end
```

How Elixir handles what it calls "changesets" via its database adapter of choice, [Ecto](https://hexdocs.pm/ecto/Ecto.html), is a topic of celebration for another day. For now, if this is unfamiliar, just know that there is no proper `upsert` function in Elixir and, therefore, what we've done is create a bundle of changes that either correspond to an existing record and a set of params (`Resource.changeset(resource, params)` where `resource` is actually a `%Resource{}` that corresponds to a record already in our db) or an empty struct of the relevant type (`%Resource{}`) and params that comprise prospective attributes for a new resource record. When either of these is handed to `insert_or_update` it knows which operation to perform.

Notice that we don't store the `info` param on resource. That's because info happens to be a big, nasty, barely readable map of key-values that we want to store as context for the given resource. We could have just stored it as is as `jsonb` in a column on resource itself, but it's so nasty at the moment that we have some transformations that need doing, some of which may even require further requests external to our API's guts.

Assuming we have a module for this called `ETLer` with a method `do_it/2` that accepts the upserted `Resource{}`and the info map, we can do the following:

```elixir
{:ok, resource} ->
  Task.start fn -> ETLer.do_it(resource, info) end
  json(conn, %{success: "yay!"})
```
After starting the task, our API will _immediately_ return the json with the success status to the client, while a new subtask is still running with `ETLer.do_it(our_upserted_resource, info)` in the background for however long that takes.

## Why I'm excited

> "My application code should be the source of truth for the behavior of my application whenever it can be."

This is superior to Ruby because I've both delegated and initiated the task _in the context of the current running process and in a way that process can computationally handle_. The whole point of OO programming was that I was supposed to have all the tools laid out for me, ready to put together. And yet, when I want to do something asynchronously in the context of the most relevant task (e.g. as I do above where I want to chain the creation of info records with the relevant resource), I have to start sprinting sideways to deal with stuff above my object-oriented code's pay grade to get my system to behave.

My application code should be the source of truth for the behavior of my application whenever it can be. Ruby makes that difficult for me on a fundamental level. Duck-typing and good design don't mean shit when I have to screw around with Sidekiq and sacrifice a goat to get puma handling a decent amount of requests on hardware I can afford.

While Javascript is, unlike Ruby, equipped to handle these things in a substantial sense via the event loop and the modern paradigm of Promises, it's worth considering the subtle differences in approach and the non-subtle computational differences.

In Elixir, I'm using `Task.start` to tell the EVM I need some CPU allocated in parallel to run the current task in the context of the current process. That means

1. I get what I want: application code that acts as a source of truth for the actual thing I'm doing.
2. It's predictable (it feels weird to even use this word as a programmer).
3. The application logic hews close to what's actually happening under the hood. This dovetails with #2, but the point is that the execution doesn't have many external variables on which its behavior depends, especially not on a fundamental level.

What would have happened in JavaScript if I did the same thing on the endpoint of an Express server? At a high level, it's similar enough: I would say "go run the guts of this promise and, when you're done, here's what you should do."

Except there's a big caveat here: _all of my JavaScript code is running asynchronously_. It just happens to be the case that _some_ things do so in a way that I manage with application logic.

But I don't want to manage that stuff. Handling promises, even with async and await, is constant boilerplate. My application violates #1 in that it comprises a source of truth _and_ a meta-source of truth about how it handles its own asynchronous nature.

Further, in violation of #2, the basic truthiness of my code is obscured at runtime in a way that makes it unpredictable via the event loop because, in violation of #3, the event loop is a weird amorphous blob of I/O-constrained activity (not CPU like erlang) of _everything happening on my application all the time_.

Things can get blocked. Things can become blockers. How do I handle that? _More application logic._ And this doesn't speak in any way to the difficulty of debugging these kinds of issues in the first place.

## Choose your own problems

Elixir still allows you to block your code with `Task.async` and `Task.await`: you provision resources to run a task off in a corner and set a blocking point in your code for the completion of the task via `await`. But this kind of blocking is introduced by the developer's choice at the application level and is not a fundamental behavior that needs to constantly be kept in check.

To wit, `Task.await` accepts an option to define a timeout when waiting for the task. In JavaScript, to do something similar, you would have to have a `setTimeout` in _any individual Promise code_ to get the same behavior. This contrast is right at the crux of things: where Elixir gives you a predictable, inline, application-level option, JavaScript gives you the freedom to introduce more uncertainty at the cost of defining the behavior you want at any given time, without also affording predictability with that behavior.

## What about Python

No.
