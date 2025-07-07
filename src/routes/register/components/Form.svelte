<script lang="ts">
    import { enhance } from '$app/forms'
    import { Button } from 'bits-ui'

    let password = $state('')
    let confirmPassword = $state('')
    let email = $state('')
    let form = $state({
        success: false,
        message: ''
    })
    
    let passwordValid = $derived(validatePassword(password))
    let emaiValid = $derived(validateEmail(email))
    let passwordsMatch = $derived(password === confirmPassword && confirmPassword !== '')
    let formValid = $derived(passwordValid.isValid && passwordsMatch && emaiValid)
    
    function validatePassword(pwd: string) {
        const hasMinLength = pwd.length >= 8
        const hasLetter = /[a-zA-Z]/.test(pwd)
        const hasNumber = /\d/.test(pwd)
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
        
        return {
            isValid: hasMinLength && hasLetter && hasNumber && hasSymbol,
            hasMinLength,
            hasLetter,
            hasNumber,
            hasSymbol
        }
    }

    function validateEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
</script>

<form action="?/register" method="post" use:enhance={() => {
        return ({ result }) => {
            if (result.type === 'success') {
                form.success = true
                form.message = (result.data as any)?.message || 'Registration successful! Please verify your email by clicking the link sent.'
            } else if (result.type === 'failure') {
                form.success = false
                form.message = (result.data as any)?.message || 'An error occurred during registration.'
            }
        }
    }
} class="space-y-6">
    <div class="flex flex-col gap-6 md:flex-row md:gap-4">
        <div>
            <label for="firstname" class="block text-sm font-medium mb-2 text-foreground">
                First Name*
            </label>
            <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Enter your first name"
                required
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground"
            />
        </div>

        <div>
            <label for="lastname" class="block text-sm font-medium mb-2 text-foreground">
                Last Name
            </label>
            <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Enter your last name"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground"
            />
        </div>
    </div>

    <div>
        <label for="email" class="block text-sm font-medium mb-2 text-foreground">
            Email Address*
        </label>
        <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your personal email"
            required
            bind:value={email}
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground"
        />
        {#if email && !emaiValid}
            <p class="mt-1 text-xs text-destructive">Invalid email format</p>
        {:else if email && emaiValid}
            <p class="mt-1 text-xs text-success">✓ Valid email</p>
        {/if}
    </div>

    <div>
        <label for="password" class="block text-sm font-medium mb-2 text-foreground">
            Set a password*
        </label>
        <input
            type="password"
            id="password"
            name="password"
            bind:value={password}
            placeholder="Create a secure password"
            required
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-200 bg-background-alt text-foreground placeholder:text-muted-foreground {password && !passwordValid.isValid ? 'border-destructive focus:ring-destructive' : 'border-border-input focus:ring-primary'}"
        />
        <div class="mt-2 space-y-1">
            <div class="flex items-center text-xs {passwordValid.hasMinLength ? 'text-success' : 'text-muted-foreground'}">
                <span class="mr-2">{passwordValid.hasMinLength ? '✓' : '○'}</span>
                At least 8 characters
            </div>
            <div class="flex items-center text-xs {passwordValid.hasLetter ? 'text-success' : 'text-muted-foreground'}">
                <span class="mr-2">{passwordValid.hasLetter ? '✓' : '○'}</span>
                At least 1 letter
            </div>
            <div class="flex items-center text-xs {passwordValid.hasNumber ? 'text-success' : 'text-muted-foreground'}">
                <span class="mr-2">{passwordValid.hasNumber ? '✓' : '○'}</span>
                At least 1 number
            </div>
            <div class="flex items-center text-xs {passwordValid.hasSymbol ? 'text-success' : 'text-muted-foreground'}">
                <span class="mr-2">{passwordValid.hasSymbol ? '✓' : '○'}</span>
                At least 1 symbol (!@#$%^&*(),.?":|{'<>'})
            </div>
        </div>
    </div>
    
    <div>
        <label for="confirmPassword" class="block text-sm font-medium mb-2 text-foreground">
            Confirm Password*
        </label>
        <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            bind:value={confirmPassword}
            placeholder="Confirm your password"
            required
            class="w-full px-3 py-2 border rounded-md  focus:outline-none focus:ring-2 transition duration-200 bg-background-alt text-foreground placeholder:text-muted-foreground {confirmPassword && !passwordsMatch ? 'border-destructive focus:ring-destructive' : 'border-border-input focus:ring-primary'}"
        />
        {#if confirmPassword && !passwordsMatch}
            <p class="mt-1 text-xs text-destructive">Passwords do not match</p>
        {:else if confirmPassword && passwordsMatch}
            <p class="mt-1 text-xs text-success">✓ Passwords match</p>
        {/if}
    </div>

    <div>
        <Button.Root 
            type="submit" 
            disabled={!formValid}
            class="w-full font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center disabled:cursor-not-allowed {formValid ? 'bg-primary text-background hover:opacity-90' : 'bg-muted text-muted-foreground'}"
        >
            Create Account
        </Button.Root>
    </div>
    {#if form?.success}
        <div class="rounded-md p-4 border bg-success border-success text-background">
            <div class="flex">
                <div class="text-sm">{form.message}</div>
            </div>
        </div>
    {:else if form?.message}
        <div class="rounded-md p-4 border bg-destructive border-destructive text-background">
            <div class="flex">
                <div class="text-sm">{form.message}</div>
            </div>
        </div>
    {/if}
</form>