const programs = [
  {
    title: "FIFO Page Replacement",
    type: "C",
    description: "Page replacement using the First-In-First-Out method.",
    code: `#include <stdio.h>

int main()
{
    int pages[50], frames[10];
    int n, f, i, j;
    int pageFault = 0, pageHit = 0;
    int pos = 0, found;

    printf("Enter number of pages: ");
    scanf("%d", &n);

    printf("Enter page reference string:\\n");
    for(i = 0; i < n; i++)
        scanf("%d", &pages[i]);

    printf("Enter number of frames: ");
    scanf("%d", &f);

    for(i = 0; i < f; i++)
        frames[i] = -1;

    for(i = 0; i < n; i++)
    {
        found = 0;

        for(j = 0; j < f; j++)
        {
            if(frames[j] == pages[i])
            {
                found = 1;
                break;
            }
        }

        if(found == 1)
        {
            pageHit++;
            printf("\\nPage %d -> HIT", pages[i]);
        }
        else
        {
            pageFault++;

            frames[pos] = pages[i];
            pos = (pos + 1) % f;

            printf("\\nPage %d -> FAULT", pages[i]);
        }

        printf("   Frames: ");
        for(j = 0; j < f; j++)
        {
            if(frames[j] == -1)
                printf("- ");
            else
                printf("%d ", frames[j]);
        }
    }

    printf("\\n\\nTotal Page Hits   = %d", pageHit);
    printf("\\nTotal Page Faults = %d", pageFault);
    printf("\\nHit Ratio          = %.2f",
           (float)pageHit / n);
    printf("\\nMiss Ratio         = %.2f",
           (float)pageFault / n);

    return 0;
}`
  },
  {
    title: "LRU Page Replacement",
    type: "C",
    description: "Page replacement using the Least Recently Used method.",
    code: `#include <stdio.h>

int main()
{
    int pages[50], frames[10];
    int n, f, i, j;
    int hit = 0, fault = 0;
    int pos, found;

    printf("Enter number of pages: ");
    scanf("%d", &n);

    printf("Enter page reference string:\\n");
    for(i = 0; i < n; i++)
        scanf("%d", &pages[i]);

    printf("Enter number of frames: ");
    scanf("%d", &f);

    for(i = 0; i < f; i++)
        frames[i] = -1;

    for(i = 0; i < n; i++)
    {
        found = 0;

        for(j = 0; j < f; j++)
        {
            if(frames[j] == pages[i])
            {
                found = 1;
                hit++;
                printf("\\nPage %d -> HIT", pages[i]);
                break;
            }
        }

        if(found == 0)
        {
            fault++;
            pos = -1;

            for(j = 0; j < f; j++)
            {
                if(frames[j] == -1)
                {
                    pos = j;
                    break;
                }
            }

            if(pos == -1)
            {
                int k, last, min = i;

                for(j = 0; j < f; j++)
                {
                    last = -1;

                    for(k = i - 1; k >= 0; k--)
                    {
                        if(frames[j] == pages[k])
                        {
                            last = k;
                            break;
                        }
                    }

                    if(last < min)
                    {
                        min = last;
                        pos = j;
                    }
                }
            }

            frames[pos] = pages[i];
            printf("\\nPage %d -> FAULT", pages[i]);
        }

        printf("   Frames: ");

        for(j = 0; j < f; j++)
        {
            if(frames[j] == -1)
                printf("- ");
            else
                printf("%d ", frames[j]);
        }
    }

    printf("\\n\\nTotal Page Hits   = %d", hit);
    printf("\\nTotal Page Faults = %d", fault);
    printf("\\nHit Ratio         = %.2f", (float)hit / n);
    printf("\\nMiss Ratio        = %.2f", (float)fault / n);

    return 0;
}`
  },
  {
    title: "Optimal Page Replacement",
    type: "C",
    description: "Page replacement using the Optimal Page Replacement algorithm.",
    code: `#include <stdio.h>

int main()
{
    int pages[50], frames[10];
    int n, f;
    int i, j, k;
    int pageFaults = 0, pageHits = 0;
    int found, pos;
    int farthest, nextUse;

    printf("Enter the number of pages: ");
    scanf("%d", &n);

    printf("Enter the page reference string:\\n");
    for (i = 0; i < n; i++)
        scanf("%d", &pages[i]);

    printf("Enter the number of frames: ");
    scanf("%d", &f);

    for (i = 0; i < f; i++)
        frames[i] = -1;

    for (i = 0; i < n; i++)
    {
        found = 0;

        for (j = 0; j < f; j++)
        {
            if (frames[j] == pages[i])
            {
                found = 1;
                break;
            }
        }

        if (found == 1)
        {
            pageHits++;
        }
        else
        {
            pos = -1;

            for (j = 0; j < f; j++)
            {
                if (frames[j] == -1)
                {
                    pos = j;
                    break;
                }
            }

            if (pos == -1)
            {
                farthest = -1;

                for (j = 0; j < f; j++)
                {
                    nextUse = -1;

                    for (k = i + 1; k < n; k++)
                    {
                        if (frames[j] == pages[k])
                        {
                            nextUse = k;
                            break;
                        }
                    }

                    if (nextUse == -1)
                    {
                        pos = j;
                        break;
                    }

                    if (nextUse > farthest)
                    {
                        farthest = nextUse;
                        pos = j;
                    }
                }
            }

            frames[pos] = pages[i];
            pageFaults++;
        }

        printf("\\nPage %d : ", pages[i]);

        for (j = 0; j < f; j++)
        {
            if (frames[j] == -1)
                printf("- ");
            else
                printf("%d ", frames[j]);
        }

        if (found == 1)
            printf("  Page Hit");
        else
            printf("  Page Fault");
    }

    float faultRate = ((float)pageFaults / n) * 100;
    float hitRate = ((float)pageHits / n) * 100;

    printf("\\n\\nTotal Page Faults = %d", pageFaults);
    printf("\\nTotal Page Hits = %d", pageHits);
    printf("\\nPage Fault Rate = %.2f%%", faultRate);
    printf("\\nPage Hit Rate = %.2f%%\\n", hitRate);

    return 0;
}`
  }
];

const grid = document.getElementById("programGrid");
const count = document.getElementById("programCount");
const modal = document.getElementById("viewerModal");
const modalTitle = document.getElementById("modalTitle");
const modalCode = document.getElementById("modalCode");
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const dropZone = document.getElementById("dropZone");

function renderPrograms() {
  grid.innerHTML = "";

  programs.forEach((program, index) => {
    const card = document.createElement("article");
    card.className = "program-card";
    card.innerHTML = `
      <div>
        <div class="file-badge">${program.type}</div>
        <h3>${program.title}</h3>
        <p>${program.description}</p>
      </div>
      <button class="view-btn" data-index="${index}">View Program →</button>
    `;
    grid.appendChild(card);
  });

  count.textContent = `${programs.length} programs`;
}

grid.addEventListener("click", (event) => {
  const button = event.target.closest(".view-btn");
  if (!button) return;

  const program = programs[Number(button.dataset.index)];
  modalTitle.textContent = program.title;
  modalCode.textContent = program.code;
  modal.classList.remove("hidden");
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.add("hidden");
});

document.getElementById("chooseBtn").addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length) {
    handleFile(fileInput.files[0]);
  }
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragover");

  if (event.dataTransfer.files.length) {
    handleFile(event.dataTransfer.files[0]);
  }
});

function handleFile(file) {
  fileName.textContent = `Selected: ${file.name}`;

  // Frontend-only preview: text/code files can be read locally.
  if (file.type.startsWith("text/") || /\.(c|h|cpp|java|py|js|html|css|txt)$/i.test(file.name)) {
    const reader = new FileReader();

    reader.onload = () => {
      programs.unshift({
        title: file.name,
        type: file.name.split(".").pop().toUpperCase(),
        description: "Newly selected local file.",
        code: reader.result
      });

      renderPrograms();
      document.getElementById("view").scrollIntoView({ behavior: "smooth" });
    };

    reader.readAsText(file);
  } else {
    alert("This basic prototype currently previews text/code files.");
  }
}

renderPrograms();
