<script>
	import {paragraph} from 'txtgen';

    const exampleText =  paragraph(1);
</script>
<div class="ml-6 p-6" contenteditable="true">
    <h3>Our issue:</h3>
    <ul>
        <li>You can paste your jira issue here.</li>
    </ul>
    <p>{exampleText}</p>
</div>