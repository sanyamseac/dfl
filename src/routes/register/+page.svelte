<script lang="ts">
    import { goto } from '$app/navigation'
    import Form from './components/Form.svelte'
    import Resend from './components/Resend.svelte'
    import { Button } from 'bits-ui'

    let openModal = $state(false)
</script>

<svelte:head>
    <title>Applicant Registration - Academic Institute</title>
    <meta name="description" content="Register for an account" />
    <meta name="keywords" content="register, signup, create account" />
</svelte:head>

<Resend bind:openModal />
<div class="flex items-center justify-center py-12 px-2 sm:px-4 lg:px-8 bg-background">
    <div class="max-w-md w-full space-y-8">
        <div class="text-center">
            <h2 class="text-3xl font-semibold mb-2 text-primary">Applicant Registration</h2>
            <p class="text-sm text-foreground-alt">Create an account to apply</p>
        </div>

        <div class="shadow-xl rounded-lg p-4 md:p-8 border bg-background-alt border-border-card">
            <Form />
            <div class="mt-6 text-center">
                <p class="text-sm text-foreground-alt">
                    Already have an account? 
                    <a href="/login" class="cursor-pointer font-medium transition duration-200 text-primary hover:opacity-80">
                        Sign in here
                    </a>
                </p>
            </div>
            <div class="mt-6 text-center">
                <p class="text-sm text-foreground-alt">
                    Didn't receive a verification email?
                    <Button.Root onclick={() => openModal = true} class="cursor-pointer font-medium transition duration-200 text-primary hover:opacity-80">
                        Resend verification email
                    </Button.Root>
                </p>
            </div>
        </div>

        <div class="text-center text-xs text-muted-foreground">
            <p>By registering, you agree to our Terms of Service and Privacy Policy</p>
        </div>
    </div>
</div>